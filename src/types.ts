// types.ts (optional)
export interface PromptProps {
    id: string;
  selected: string;
  title: string;
  code: string;
  tags: string[];
}

export interface PromptState {
  selected: string;
  prompt: PromptProps[];
  title: string;
  code: string;
  tags: string[];
}


export interface UserProfile {
  avatar_url: string;
  email: string;
  email_verified: boolean;
  full_name: string;
  iss: string;
  name: string;
  phone_verified: boolean;
  picture: string;
  provider_id: string;
  sub: string;
}

