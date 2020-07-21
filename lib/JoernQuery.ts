enum JoernQueryStatus {
  PENDING = 'PENDING',
  REQUESTED = 'REQUESTED',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export default class JoernQuery {
  query: string;
  status: JoernQueryStatus = JoernQueryStatus.PENDING;
  completeCallback: (data: any) => void;
  constructor(query: string, completedCallback: (data: any) => void) {
    this.query = query;
    this.completeCallback = completedCallback;
  }
}
