import { Content } from './content';
import { randomUUID } from 'crypto';

export interface NotificationProps {
  recipientId: string;
  content: Content;
  category: string;
  createdAt?: Date;
}

export class Notification {
  private _id: string;
  private props: NotificationProps;

  constructor(
    props: NotificationProps,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: new Date(),
    };
  }

  public get id(): string {
    return this._id;
  }

  public get recipientId(): string {
    return this.props.recipientId;
  }

  public get content(): Content {
    return this.props.content;
  }

  public get category(): string {
    return this.props.category;
  }
}
