/**
 * Email notifications disabled.
 */
async function sendEnquiryEmail(enquiry) {
  return { success: false, disabled: true };
}

module.exports = { sendEnquiryEmail };
