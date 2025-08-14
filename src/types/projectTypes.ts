export interface ProjectAvatar {
  readonly type: 'image' | 'letter-a' | 'letter-j';
  readonly src?: string;
  readonly letter?: string;
}

export interface ProjectCategory {
  readonly label: string;
  readonly className: string;
}

export interface Project {
  readonly id: string;
  readonly title: string;
  readonly href: string;
  readonly imageSrc: string;
  readonly imageAlt: string;
  readonly avatar: ProjectAvatar;
  readonly category: ProjectCategory;
  readonly remixes: number;
}
