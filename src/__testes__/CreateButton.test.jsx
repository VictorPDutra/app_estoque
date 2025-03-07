import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CreateButton from "../components/buttons/createbutton/CreateButton";

test("O botão aciona o evento onSubmit ao ser clicado dentro de um formulário", () => {
  const mockOnSubmit = vi.fn((e) => e.preventDefault()); // Simula um evento de submit

  render(
    <form onSubmit={mockOnSubmit}>
      <CreateButton label="Adicionar" />
    </form>
  );

  const button = screen.getByText("Adicionar");
  expect(button).toBeInTheDocument(); // Verifica se o botão foi renderizado

  fireEvent.submit(button); // Simula o envio do formulário

  expect(mockOnSubmit).toHaveBeenCalledTimes(1); // Verifica se a função foi chamada
});
