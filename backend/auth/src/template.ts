export const forgotPasswordTemplate = (resetLink: string, name: string) => {
  return `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Reset Your Jobvyn Password</title>
    <style>
      /* Modern CSS Reset */
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          Oxygen, Ubuntu, sans-serif;
        background-color: #f8fafc;
        line-height: 1.6;
        color: #334155;
        -webkit-font-smoothing: antialiased;
      }

      .email-wrapper {
        width: 100%;
        min-height: 100vh;
        padding: 20px;
      }

      .email-container {
        max-width: 600px;
        margin: 0 auto;
        background: white;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
          0 10px 10px -5px rgba(0, 0, 0, 0.04);
        border: 1px solid #e2e8f0;
      }

      /* Header with JobVyn branding */
      .header {
        background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
        padding: 48px 32px;
        text-align: center;
        position: relative;
        overflow: hidden;
      }

      .header::before {
        content: "";
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: radial-gradient(
          circle,
          rgba(255, 255, 255, 0.1) 1px,
          transparent 1px
        );
        background-size: 30px 30px;
        animation: float 20s linear infinite;
      }

      @keyframes float {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }

      .logo {
        position: relative;
        z-index: 1;
        margin-bottom: 16px;
      }

      .logo-text {
        font-size: 24px;
        font-weight: 700;
        color: white;
        letter-spacing: -0.5px;
      }

      .header h1 {
        position: relative;
        z-index: 1;
        color: white;
        font-size: 32px;
        font-weight: 700;
        margin: 0;
        letter-spacing: -0.025em;
      }

      /* Content Area */
      .content {
        padding: 48px 32px;
      }

      .greeting {
        font-size: 18px;
        color: #334155;
        margin-bottom: 24px;
        font-weight: 500;
      }

      .instruction {
        color: #475569;
        font-size: 16px;
        margin-bottom: 32px;
        line-height: 1.7;
      }

      /* Primary Action Button */
      .action-section {
        text-align: center;
        margin: 40px 0;
      }

      .reset-button {
        display: inline-block;
        padding: 16px 48px;
        background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
        color: white;
        text-decoration: none;
        border-radius: 12px;
        font-weight: 600;
        font-size: 16px;
        transition: all 0.3s ease;
        box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.3),
          0 2px 4px -1px rgba(79, 70, 229, 0.2);
        border: none;
        cursor: pointer;
      }

      .reset-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 15px -3px rgba(79, 70, 229, 0.3),
          0 4px 6px -2px rgba(79, 70, 229, 0.2);
      }

      /* Alternative Link Section */
      .alternative-section {
        margin: 32px 0;
      }

      .section-label {
        font-size: 14px;
        color: #64748b;
        margin-bottom: 12px;
        text-align: center;
        font-weight: 500;
      }

      .link-container {
        background: #f8fafc;
        border: 2px dashed #cbd5e1;
        border-radius: 12px;
        padding: 20px;
        margin-top: 8px;
        transition: all 0.3s ease;
      }

      .link-container:hover {
        border-color: #94a3b8;
        background: #f1f5f9;
      }

      .reset-link {
        font-family: "SF Mono", Monaco, "Courier New", monospace;
        font-size: 14px;
        color: #4f46e5;
        word-break: break-all;
        line-height: 1.5;
        text-decoration: none;
        display: block;
      }

      .reset-link:hover {
        color: #7c3aed;
        text-decoration: underline;
      }

      /* Security Notice */
      .security-notice {
        background: linear-gradient(135deg, #fef3c7 0%, #fffbeb 100%);
        border-left: 4px solid #f59e0b;
        border-radius: 8px;
        padding: 20px;
        margin: 32px 0;
      }

      .security-header {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 12px;
      }

      .security-icon {
        color: #d97706;
        font-size: 20px;
      }

      .security-title {
        color: #92400e;
        font-weight: 600;
        font-size: 16px;
      }

      .security-content {
        color: #92400e;
        font-size: 14px;
        line-height: 1.6;
      }

      .highlight {
        background: #fef3c7;
        padding: 2px 6px;
        border-radius: 4px;
        font-weight: 600;
      }

      /* Support Section */
      .support-section {
        margin-top: 32px;
        padding-top: 32px;
        border-top: 1px solid #e2e8f0;
        text-align: center;
      }

      .support-text {
        color: #64748b;
        font-size: 14px;
        margin-bottom: 8px;
      }

      .support-link {
        color: #4f46e5;
        text-decoration: none;
        font-weight: 500;
      }

      .support-link:hover {
        text-decoration: underline;
      }

      /* Footer */
      .footer {
        background: #f8fafc;
        padding: 32px;
        text-align: center;
        border-top: 1px solid #e2e8f0;
      }

      .footer-logo {
        color: #4f46e5;
        font-size: 18px;
        font-weight: 700;
        margin-bottom: 16px;
        letter-spacing: -0.5px;
      }

      .footer-text {
        color: #94a3b8;
        font-size: 12px;
        line-height: 1.5;
        margin-bottom: 8px;
      }

      .footer-links {
        margin-top: 16px;
      }

      .footer-link {
        color: #64748b;
        font-size: 12px;
        text-decoration: none;
        margin: 0 8px;
      }

      .footer-link:hover {
        color: #4f46e5;
        text-decoration: underline;
      }

      /* Responsive Design */
      @media (max-width: 640px) {
        .email-wrapper {
          padding: 16px;
        }

        .header {
          padding: 32px 24px;
        }

        .header h1 {
          font-size: 28px;
        }

        .content {
          padding: 32px 24px;
        }

        .reset-button {
          padding: 14px 32px;
          width: 100%;
        }
      }
    </style>
  </head>
  <body>
    <table role="presentation" class="email-wrapper">
      <tr>
        <td align="center">
          <table role="presentation" class="email-container">
            <!-- Header with Branding -->
            <tr>
              <td class="header">
                <div class="logo">
                  <div class="logo-text">JobVyn</div>
                </div>
                <h1>Password Reset Request</h1>
              </td>
            </tr>

            <!-- Main Content -->
            <tr>
              <td class="content">
                <p class="greeting">👋Hey ${name || "there"},</p>

                <p class="instruction">
                  We received a request to reset your Jobvyn account password.
                  To proceed with creating a new password, please click the
                  button below. This link is valid for
                  <strong>10 minutes</strong>.
                </p>

                <!-- Primary Action Button -->
                <div class="action-section">
                  <a href="${resetLink}" class="reset-button" target="_blank">
                    Reset My Password
                  </a>
                </div>

                <!-- Alternative Link Option -->
                <div class="alternative-section">
                  <div class="section-label">
                    If the button doesn't work, copy this link:
                  </div>
                  <div class="link-container">
                    <a href="${resetLink}" class="reset-link" target="_blank">
                      ${resetLink}
                    </a>
                  </div>
                </div>

                <!-- Security Notice -->
                <div class="security-notice">
                  <div class="security-header">
                    <span class="security-icon">⚠️</span>
                    <span class="security-title">Security Notice</span>
                  </div>
                  <p class="security-content">
                    For your security, this password reset link will expire in
                    <span class="highlight">10 minutes</span>. If you didn't
                    request this password reset, please ignore this email or
                    secure your account by contacting our support team.
                  </p>
                </div>

                
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td class="footer">
                <div class="footer-logo">JobVyn</div>
                <p class="footer-text">Connecting talent with opportunity</p>
                <p class="footer-text">
                  This is an automated message. Please do not reply directly to
                  this email.
                </p>
                <p class="footer-text">
                  © ${new Date().getFullYear()} JobVyn. All rights reserved.
                </p>
                <div class="footer-links">
                  <a href="https://jobvyn.com/privacy" class="footer-link"
                    >Privacy Policy</a
                  >
                  <a href="https://jobvyn.com/terms" class="footer-link"
                    >Terms of Service</a
                  >
                  <a href="https://jobvyn.com/help" class="footer-link"
                    >Help Center</a
                  >
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>

`;
};
