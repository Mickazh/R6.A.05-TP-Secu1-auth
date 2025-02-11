import { createHash } from "node:crypto";

const users = []; // Simule BDD pour le stockage des utilisateurs
const role = ["admin", "utilisateur"];

export const addUser = async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = createHash("sha256")
    .update(password)
    .digest()
    .toString("hex");

  let user = users.find(
    (u) => u.email === email && u.password === hashedPassword
  );
  if (user) {
    res.status(401).send({
      message: "Utilisateur déjà enregistré",
      user,
    });
    return;
  }

  const newUser = {
    email,
    password: hashedPassword,
    role: role[Math.floor(Math.random()*2)],
  };

  users.push(newUser);
  res.status(201).send({
    message: "Utilisateur crée",
    newUser,
  });
};

export const loginUser = async function (req, res) {
  const { email, password } = req.body;
  const hashedPassword = createHash("sha256")
    .update(password)
    .digest()
    .toString("hex");

  const user = users.find(
    (u) => u.email === email && u.password === hashedPassword
  );
  if (!user) {
    res.status(401).send({
      message: "Utilisateur  non-identifié",
    });
    return;
  }

  const token = await res.jwtSign({ email: user.email, role: user.role });

  res.status(200).send({ token });
};
