type Face = {
  faceId: string;
  faceRectangle: {
    width: number;
    height: number;
    left: number;
    top: number;
  };
};

type Student = {
  name: string;
  confidence: number;
};

type myError = {
  error: {
    code: string;
    message: string;
  };
};
