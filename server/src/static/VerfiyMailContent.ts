interface UserMailToSend {
  name: string;
  verfiyCode: number;
}

export const VerifyMailContent = ({ name, verfiyCode }: UserMailToSend) => {
  return {
    body: {
      name: name,
      intro: "Welcome to Mailgen! We're very excited to have you on board.",
      action: {
        instructions:
          "Please Copy this code and send it from the Form that you have in the copilot App",
        button: {
          color: "#22BC66",
          text: verfiyCode.toString(),
          link: "",
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};
