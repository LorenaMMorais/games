import app from "app";
import supertest from "supertest";
import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import { createAGame } from "./factories/createAGame";
import { createGame } from "./factories/createGame";
import { cleanDB } from "./factories/cleanDB";

const server = supertest(app);

