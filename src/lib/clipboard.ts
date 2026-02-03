/**
 * Copy text to clipboard with fallback for browsers that block the Clipboard API
 * @param text - The text to copy
 * @returns Promise that resolves to true if successful, false otherwise
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  // Try modern Clipboard API first
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      // Silently fall through to fallback method
      // This is expected in iframes or when clipboard permissions are blocked
    }
  }

  // Fallback method using a temporary textarea
  return fallbackCopyToClipboard(text);
}

/**
 * Fallback clipboard copy method using textarea
 */
function fallbackCopyToClipboard(text: string): boolean {
  try {
    // Create a temporary textarea element
    const textarea = document.createElement('textarea');
    textarea.value = text;
    
    // Make it invisible but keep it in the DOM
    textarea.style.position = 'fixed';
    textarea.style.top = '0';
    textarea.style.left = '0';
    textarea.style.width = '2em';
    textarea.style.height = '2em';
    textarea.style.padding = '0';
    textarea.style.border = 'none';
    textarea.style.outline = 'none';
    textarea.style.boxShadow = 'none';
    textarea.style.background = 'transparent';
    textarea.style.opacity = '0';
    
    document.body.appendChild(textarea);
    
    // Select and copy the text
    textarea.focus();
    textarea.select();
    
    let successful = false;
    try {
      successful = document.execCommand('copy');
    } catch (err) {
      // Silently fail - fallback didn't work
    }
    
    // Clean up
    document.body.removeChild(textarea);
    
    return successful;
  } catch (err) {
    // Silently fail - fallback didn't work
    return false;
  }
}
