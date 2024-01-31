import "reflect-metadata";
import express from "express";
import { DataSource } from "typeorm";
import { User } from "../src/entities/User";
import { Profile } from "./entities/Profile";
const app = express();
const port = 3000;

app.get("/", async (req, res) => {
  try {
    const userRepo = appDataSource.getRepository(User);
    const getAll = await userRepo.find({
      relations: {
        profile: true,
      },
    });
    res.status(201).json({
      fetches_at: Date(),
      data: {
        getAll,
      },
    });
  } catch (err: any) {
    res.status(500).json({
      message: "INTERNAL SERVER ERROR",
    });
  }
  {
  }
});

app.post("/", async (req, res) => {
  try {
    const userRepo = appDataSource.getRepository(User);
    const profileRepo = appDataSource.getRepository(Profile);
    let profile: Profile = new Profile();
    profile.gender = "male";
    profile.marks = 100;
    profile.rating = 9;

    let user: User = new User();
    user.username = "subham";
    user.hasCode = true;
    user.language = "javascript";
    user.status = true;
    user.email = "shubhamrajjsohi69@gmail.com";
    user.profile = profile;

    const created = userRepo.save(user);
    res.status(201).json({
      created: new Date().getUTCDay,
      message: "Successfully inserted",
      data: {
        created,
      },
    });
  } catch (err: any) {
    res.status(500).json({
      message: "INTERNAL SERVER ERROR",
    });
  }
});

app.patch("/:id", async (req, res) => {
  /* const id: number = parseInt(req.params.id);
  try {
    const userRepo = appDataSource.getRepository(User);
    const upating = await userRepo.update(id, {
      username: "Subham",
      email: "hero@gmail.com",
      status: false,
      language: "python",
      hasCode: false,
    });
    res.status(201).json({
      date: new Date().getDay,
      data: {
        upating,
      },
    });
  } catch (err: any) {
    res.status(500).json({
      message: "INTERNAL SERVER ERROR",
    });
  }*/
  const userRepo = appDataSource.getRepository(User);
  const id: number = parseInt(req.params.id);
  const findUser = await userRepo.findOne({
    where: {
      id: id,
    },
  });
  if (findUser) {
    findUser.username = "sandeep";
    findUser.hasCode = true;
    findUser.status = true;
    findUser.language = "reactjs";
    findUser.email = "sandep@gmail.com";
    findUser.profile.gender = "female";
    findUser.profile.marks = 100;
    findUser.profile.rating = 10.0;
    const upating = await userRepo.save(findUser);
    res.json(201).json({
      message: "Updated Successfully",
      data: {
        upating,
      },
    });
  } else {
    res.status(404).json({
      message: "ID IS NOT FOUND",
    });
  }
});

app.delete("/:id", async (req, res) => {
  const id: number = parseInt(req.params.id);
  try {
    const userRepo = appDataSource.getRepository(User);
    const deleted = await userRepo.delete(id);
    res.status(201).json({
      message: "Successfully deleted",
    });
  } catch (err: any) {
    res.status(500).json({
      message: "INTERNAL SERVER ERROR",
    });
  }
});

const appDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "admin",
  database: "crud_db",
  entities: ["src/entities/*{.ts,.js}"],
  synchronize: true,
  logging: true,
});

appDataSource
  .initialize()
  .then(() => {
    console.log("Database is connected");
    app.listen(port, () => {
      console.log(`Server is running on ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
