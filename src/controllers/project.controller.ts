import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Id } from 'objection';
import { Project } from '../models';

const list = async (req: Request, res: Response): Promise<Response> => {
  const skip = Number(req.query.skip!) || 0;
  const limit = Number(req.query.limit!) || 10;
  const userId = req.query.userId;
  let projects : Project[] = [];
  if(userId === undefined)
    return res.sendStatus(StatusCodes.NOT_FOUND);
  else
    projects = await Project.query().where({owner: userId}).limit(limit).offset(skip);

  projects.forEach(obj => obj.isRunning = new Date(projects[0].endDate) > new Date() ? true : false );
  return res.status(StatusCodes.OK).json(projects);
};

export const get = async (req: Request, res: Response): Promise<Response> => {
  const id: Id = req.params.id;
  try {
    const project = await Project.query().findById(id).throwIfNotFound({
      message: 'Not Found',
      type: 'not_found',
    });
    return res.status(StatusCodes.OK).json(project);
  } catch (e) {
    return res.sendStatus(StatusCodes.NOT_FOUND);
  }
};

export const create = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const project = await Project.query().insert(req.body);
  return res.status(StatusCodes.CREATED).json(project);
};

export const update = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: Id = req.params.id;
  try {
    await Project.query().findById(id).patch(req.body).throwIfNotFound({
      message: 'Not Found',
      type: 'not_found',
    });
    return res.sendStatus(StatusCodes.OK);
  } catch (e) {
    return res.sendStatus(StatusCodes.NOT_FOUND);
  }
};

export const ProjectController = {
  get,
  create,
  update,
  list
};
