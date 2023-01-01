import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Id } from 'objection';
import { Task } from '../models';

const list = async (req: Request, res: Response): Promise<Response> => {
  const skip = Number(req.query.skip) || 0;
  const limit = Number(req.query.limit) || 10;
  const projectId = req.query.projectId;
  let tasks: Task[] = [];
  if(projectId === undefined) 
    return res.sendStatus(StatusCodes.NOT_FOUND);
  else
    tasks = await Task.query().where({projectId: projectId}).limit(limit).offset(skip);
  return res.status(StatusCodes.OK).json(tasks);
};

export const get = async (req: Request, res: Response): Promise<Response> => {
  const id: Id = req.params.id;
  try {
    const task = await Task.query().findById(id).throwIfNotFound({
      message: 'Not Found',
      type: 'not_found',
    });
    return res.status(StatusCodes.OK).json(task);
  } catch (e) {
    return res.sendStatus(StatusCodes.NOT_FOUND);
  }
};

export const create = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const task = await Task.query().insert(req.body);
  return res.status(StatusCodes.CREATED).json(task);
};

export const update = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: Id = req.params.id;
  try {
    await Task.query().findById(id).patch(req.body).throwIfNotFound({
      message: 'Not Found',
      type: 'not_found',
    });
    return res.sendStatus(StatusCodes.OK);
  } catch (e) {
    return res.sendStatus(StatusCodes.NOT_FOUND);
  }
};

export const TaskController = {
  get,
  create,
  update,
  list,
};
