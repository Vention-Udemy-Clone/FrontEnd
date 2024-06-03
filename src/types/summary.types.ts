export type SummaryCreateRequest = {
  summary: string;
  lessonId: string;
};

export type SummaryDeleteRequest = {
  id: string;
};

export type SummaryUpdateRequest = {
  summary: string;
  lessonId: string | undefined;
};

export type Summary = {
  id: string;
  lessonId: string;
  userId: string;
  summary: string;
};

export type SummaryCreateResponse = {
  success: boolean;
  data: Summary;
};

export type SummaryGeneratedResponse = {
  success: boolean;
  data: string;
};
