import app from "./index";

const start = async () => {
  try {
    await app.listen({ port: 3333 });
    app.log.info("Server is running on port 3333");
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

start();
