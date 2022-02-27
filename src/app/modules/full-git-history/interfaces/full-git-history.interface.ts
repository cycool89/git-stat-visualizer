export interface IReflog {
  selector?: string;
  name?: string;
  email?: string;
  message?: string;
}

export interface IGpg {
  type: 'G' | 'B' | 'U';
  name?: string;
  key?: string;
}

export interface IUser {
  user: { name: string, email: string };
  date: Date;
}

export interface IRemote {
  [branchName: string]: IRef
}

export interface IRef {
  sha1: string;
  type: 'commit' | 'tag' | 'tree' | 'blob';
  size: number;
  upstream?: string;
  push?: string;
  HEAD?: boolean;
  objecttype?: 'commit' | 'tag' | 'tree' | 'blob';
  object?: string;
  tagger?: IRef;
  message?: string;
}

export interface ICommit {
  sha1: string;
  parents: string[];
  tree: string;
  author: IUser;
  committer: IUser;
  message: string;
  GPG?: IGpg;
  encoding?: string;
  reflog?: IReflog;
}

export interface IFullGitHistory {
  commits: ICommit[];
  heads: { [name: string]: IRef };
  tags: { [name: string]: IRef };
  remotes: { [name: string]: IRemote };
  REFS: { [name: string]: string };
  stash?: IRef;
}
