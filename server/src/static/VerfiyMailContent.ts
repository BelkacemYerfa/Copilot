interface UserMailToSend {
  name: string;
  verifyCode: number;
}

export const VerifyMailContent = ({
  name,
  verifyCode: verifyCode,
}: UserMailToSend) => {
  return {
    body: {
      name: name,
      intro: "Welcome to Mailgen! We're very excited to have you on board.",
      action: {
        instructions:
          "Please Copy this code and send it from the Form that you have in the copilot App",
        button: {
          color: "#22BC66",
          text: verifyCode.toString(),
          link: "http://localhost:5173/",
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};
