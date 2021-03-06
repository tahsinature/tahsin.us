import { BaseCall } from 'src/api/baseCall';
import { IApiResponses } from 'src/interfaces/apiResponse';

export class SendMessage extends BaseCall<IApiResponses.ISendMessage> {
  public method = 'POST';
  public name = 'Send a message';
  public description = 'Send a message';

  call = (content: string) => {
    return this._baseCall(`/visitor/messages`, { content });
  };
}
