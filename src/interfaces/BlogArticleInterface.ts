export interface Article {
  title: string;
  content: string;
}

export interface BlogModalProps {
  articleId?: string;
  onClose: () => void;
}