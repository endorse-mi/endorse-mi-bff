type CommonResponseProps = {
  statusCode: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any;
};

export const commonResponseFor = ({ statusCode, body }: CommonResponseProps) => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  body: JSON.stringify(body),
});
