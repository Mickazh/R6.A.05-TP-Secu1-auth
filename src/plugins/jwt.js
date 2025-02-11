import fp from "fastify-plugin";
import fastifyJwt from "@fastify/jwt";
import { readFileSync } from "node:fs";

export default fp(async function (app, opts) {
  app.register(fastifyJwt, {
    secret: {
      private: { key: readFileSync("./.ssl/ecdsa.pri"), passphrase: "azerty" },
      public: readFileSync("./.ssl/ecdsa.pub"),
    },
    sign: {
      algorithm: "ES256",
      issuer: "info.iutparis.fr",
    },
  });
});
