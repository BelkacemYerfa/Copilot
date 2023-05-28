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
      intro: "Welcome from Copilot",
      action: {
        instructions:
          "Please Copy this code and send it from the Form that you have in the App",
        button: {
          color: "#22BC66",
          text: verifyCode.toString(),
          link: "",
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};
