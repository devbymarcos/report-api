import { FastifyRequest, FastifyReply } from "fastify";

export async function loginController(req: FastifyRequest, res: FastifyReply) {
  const app = req.server;
  const { username, password } = req.body as {
    username: string;
    password: string;
  };

  if (!username || !password) {
    return res.status(400).send({
      success: false,
      message: "Username and password are required",
      data: null,
    });
  }

  // Simulate user authentication
  // In a real application, you would check the username and password against a database
  if (username !== "admin" || password !== "password") {
    return res.status(401).send({
      success: false,
      message: "Invalid username or password",
      data: null,
    });
  }
  const payload = { username };
  const token = app.jwt.sign(payload, {
    expiresIn: "1h", // expira em 1 hora
  });

  return res.status(200).send({
    success: true,
    message: "Login successful",
    token,
  });
}
