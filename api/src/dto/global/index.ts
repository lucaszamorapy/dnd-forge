export interface IDeleteOutputDto {
  message: string;
}

export type EmailTemplate = 'reset-password'

export interface SendEmailOptions {
  to: string
  subject: string
  template: EmailTemplate
  data: Record<string, any>
}