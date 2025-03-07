import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import BackButton from "../components/buttons/backbutton/BackButton";

test("Renderiza o botão e chama navigate(-1) ao clicar", () => {
  const mockNavigate = vi.fn();

  render(<BackButton navigate={mockNavigate} />);

  const button = screen.getByRole("button");
  expect(button).toBeInTheDocument();

  fireEvent.click(button);

  expect(mockNavigate).toHaveBeenCalledWith(-1);
  expect(mockNavigate).toHaveBeenCalledTimes(1);
});
