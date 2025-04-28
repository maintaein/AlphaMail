import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: unknown) {
    console.error(error);
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div>에러가 발생했습니다. 새로고침 해주세요.</div>;
    }
    return this.props.children;
  }
}
