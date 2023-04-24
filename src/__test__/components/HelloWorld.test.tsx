import { render, screen } from '@testing-library/react';
import { HelloWorld } from 'components/HelloWorld';
import { describe, expect, it } from 'vitest';

describe('Test HelloWorld component', () => {
  it('Test render HelloWorld', () => {
    render(<HelloWorld />);

    expect(screen.getByText('Hello, world!')).toBeInTheDocument();
  });
});
