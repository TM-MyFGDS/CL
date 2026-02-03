import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-3c309bd6/health", (c) => {
  return c.json({ status: "ok" });
});

// Guest Check-in
app.post("/make-server-3c309bd6/checkin", async (c) => {
  try {
    const body = await c.req.json();
    const { propertyId, propertyName, checkinData } = body;

    if (!propertyId || !propertyName || !checkinData) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    // Create booking object
    const bookingId = crypto.randomUUID();
    const booking = {
      id: bookingId,
      propertyId,
      propertyName,
      guestFirstName: checkinData.firstName,
      guestLastName: checkinData.lastName,
      guestEmail: checkinData.email,
      guestPhone: checkinData.phone,
      guestAddress: {
        street: checkinData.streetAddress,
        postalCode: checkinData.postalCode,
        city: checkinData.city,
        country: checkinData.country,
      },
      numberOfGuests: checkinData.numberOfGuests,
      arrivalDate: checkinData.arrivalDate,
      departureDate: checkinData.departureDate,
      comments: checkinData.comments || "",
      checkinTime: new Date().toISOString(),
      status: "checked_in",
      createdAt: new Date().toISOString(),
    };

    // Save booking
    await kv.set(`booking:${bookingId}`, JSON.stringify(booking));
    
    // Set current booking for property
    await kv.set(`current_booking:${propertyId}`, bookingId);
    
    // Update property status
    await kv.set(`property_status:${propertyId}`, "occupied");

    // Add to property bookings history
    const historyKey = `property_bookings:${propertyId}`;
    const existingHistory = await kv.get(historyKey);
    const bookingIds = existingHistory ? JSON.parse(existingHistory) : [];
    bookingIds.push(bookingId);
    await kv.set(historyKey, JSON.stringify(bookingIds));

    console.log(`✅ Check-in successful for ${checkinData.firstName} ${checkinData.lastName} at ${propertyName}`);

    return c.json({ success: true, booking });
  } catch (error: any) {
    console.error("Check-in error:", error);
    return c.json({ error: "Check-in failed", details: error.message }, 500);
  }
});

// Guest Check-out
app.post("/make-server-3c309bd6/checkout", async (c) => {
  try {
    const body = await c.req.json();
    const { propertyId } = body;

    if (!propertyId) {
      return c.json({ error: "Missing propertyId" }, 400);
    }

    // Get current booking
    const currentBookingId = await kv.get(`current_booking:${propertyId}`);
    if (!currentBookingId) {
      return c.json({ error: "No active booking found" }, 404);
    }

    // Update booking status
    const bookingData = await kv.get(`booking:${currentBookingId}`);
    if (!bookingData) {
      return c.json({ error: "Booking not found" }, 404);
    }

    const booking = JSON.parse(bookingData);
    booking.status = "checked_out";
    booking.checkoutTime = new Date().toISOString();
    await kv.set(`booking:${currentBookingId}`, JSON.stringify(booking));

    // Remove current booking
    await kv.del(`current_booking:${propertyId}`);
    
    // Update property status to needs_cleaning
    await kv.set(`property_status:${propertyId}`, "needs_cleaning");
    await kv.set(`last_checkout:${propertyId}`, new Date().toISOString());

    console.log(`✅ Check-out successful for ${booking.guestFirstName} ${booking.guestLastName}`);

    return c.json({ success: true, booking });
  } catch (error: any) {
    console.error("Check-out error:", error);
    return c.json({ error: "Check-out failed", details: error.message }, 500);
  }
});

// Get current booking for a property (for guest view)
app.get("/make-server-3c309bd6/booking/:propertyId", async (c) => {
  try {
    const propertyId = c.req.param("propertyId");
    
    const currentBookingId = await kv.get(`current_booking:${propertyId}`);
    if (!currentBookingId) {
      return c.json({ booking: null });
    }

    const bookingData = await kv.get(`booking:${currentBookingId}`);
    if (!bookingData) {
      return c.json({ booking: null });
    }

    return c.json({ booking: JSON.parse(bookingData) });
  } catch (error: any) {
    console.error("Get booking error:", error);
    return c.json({ error: "Failed to get booking", details: error.message }, 500);
  }
});

// Get property status and current booking (for host dashboard)
app.get("/make-server-3c309bd6/property-status/:propertyId", async (c) => {
  try {
    const propertyId = c.req.param("propertyId");
    
    const status = await kv.get(`property_status:${propertyId}`) || "vacant";
    const currentBookingId = await kv.get(`current_booking:${propertyId}`);
    const lastCheckout = await kv.get(`last_checkout:${propertyId}`);
    
    let currentBooking = null;
    if (currentBookingId) {
      const bookingData = await kv.get(`booking:${currentBookingId}`);
      if (bookingData) {
        currentBooking = JSON.parse(bookingData);
      }
    }

    return c.json({
      status,
      currentBooking,
      lastCheckout,
    });
  } catch (error: any) {
    console.error("Get property status error:", error);
    return c.json({ error: "Failed to get status", details: error.message }, 500);
  }
});

// Mark property as cleaned (host action)
app.put("/make-server-3c309bd6/property/:propertyId/cleaned", async (c) => {
  try {
    const propertyId = c.req.param("propertyId");
    
    await kv.set(`property_status:${propertyId}`, "vacant");
    await kv.del(`last_checkout:${propertyId}`);

    console.log(`✅ Property ${propertyId} marked as cleaned`);

    return c.json({ success: true });
  } catch (error: any) {
    console.error("Mark cleaned error:", error);
    return c.json({ error: "Failed to mark as cleaned", details: error.message }, 500);
  }
});

// Get all bookings history for a property
app.get("/make-server-3c309bd6/bookings/:propertyId", async (c) => {
  try {
    const propertyId = c.req.param("propertyId");
    
    const historyKey = `property_bookings:${propertyId}`;
    const bookingIdsData = await kv.get(historyKey);
    
    if (!bookingIdsData) {
      return c.json({ bookings: [] });
    }

    const bookingIds = JSON.parse(bookingIdsData);
    const bookings = [];

    for (const bookingId of bookingIds) {
      const bookingData = await kv.get(`booking:${bookingId}`);
      if (bookingData) {
        bookings.push(JSON.parse(bookingData));
      }
    }

    // Sort by checkin time, most recent first
    bookings.sort((a, b) => new Date(b.checkinTime).getTime() - new Date(a.checkinTime).getTime());

    return c.json({ bookings });
  } catch (error: any) {
    console.error("Get bookings error:", error);
    return c.json({ error: "Failed to get bookings", details: error.message }, 500);
  }
});

// Admin Signup - Create admin user
app.post("/make-server-3c309bd6/signup", async (c) => {
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const body = await c.req.json();
    const { email, password, name, role } = body;

    if (!email || !password) {
      return c.json({ error: "Email and password are required" }, 400);
    }

    console.log(`🔍 Attempting to signup/update user: ${email}`);

    // First, try to check if user already exists
    const { data: existingUsers } = await supabase.auth.admin.listUsers();
    const existingUser = existingUsers?.users?.find(u => u.email === email);

    if (existingUser) {
      console.log(`📝 User exists, updating: ${email}`);
      
      // User exists - update their metadata and confirm email
      const { data: updatedUser, error: updateError } = await supabase.auth.admin.updateUserById(
        existingUser.id,
        {
          password: password, // Update password
          email_confirm: true, // Confirm email
          user_metadata: {
            name: name || 'User',
            role: role || 'starter',
            email: email
          }
        }
      );

      if (updateError) {
        console.error("❌ Update user error:", updateError);
        return c.json({ error: "Failed to update existing user", details: updateError.message }, 500);
      }

      console.log(`✅ User updated successfully: ${email} with role: ${role || 'starter'}`);
      return c.json({ success: true, user: updatedUser.user, updated: true });
    }

    // User doesn't exist - create new user
    console.log(`🆕 Creating new user: ${email}`);
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { 
        name: name || 'User',
        role: role || 'starter',
        email: email
      },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.error("❌ Signup error:", error);
      return c.json({ error: "Signup failed", details: error.message }, 500);
    }

    console.log(`✅ User created: ${email} with role: ${role || 'starter'}`);

    return c.json({ success: true, user: data.user, updated: false });
  } catch (error: any) {
    console.error("❌ Signup error:", error);
    return c.json({ error: "Signup failed", details: error.message }, 500);
  }
});

// Debug endpoint - List all users (for development)
app.get("/make-server-3c309bd6/debug/users", async (c) => {
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const { data: { users }, error } = await supabase.auth.admin.listUsers();

    if (error) {
      console.error("Error listing users:", error);
      return c.json({ error: error.message }, 500);
    }

    // Only return safe info
    const safeUsers = users?.map(u => ({
      id: u.id,
      email: u.email,
      email_confirmed_at: u.email_confirmed_at,
      created_at: u.created_at,
      updated_at: u.updated_at,
      user_metadata: u.user_metadata,
    })) || [];

    return c.json({ users: safeUsers, count: safeUsers.length });
  } catch (error: any) {
    console.error("Debug error:", error);
    return c.json({ error: error.message }, 500);
  }
});

Deno.serve(app.fetch);