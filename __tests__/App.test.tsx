import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import App from "@/App";


interface ItemProps {route: string, label: string}
// Mock components
vi.mock("@/components/navDrawer", () => ({
  NavDrawer: ({ children, items, onItemClick }: {children: React.ReactNode, items: ItemProps[], onItemClick: (item: ItemProps ) => void}) => (
    <div data-testid="nav-drawer">
      {items.map((item: ItemProps) => (
        <button
        type="button"
          key={item.route}
          onClick={() => onItemClick(item)}
          data-testid={`nav-item-${item.label}`}
        >
          {item.label}
        </button>
      ))}
      {children}
    </div>
  ),
}));

vi.mock("@/components/button", () => ({
  Button: ({ label }: {label: string}) => <button role='button' type="button">{label}</button>,
}));

vi.mock("@/routes/home.tsx", () => ({
  default: () => <div data-testid="home-page">Home Page</div>,
}));

vi.mock("@/routes/status.tsx", () => ({
  default: () => <div data-testid="status-page">Status Page</div>,
}));

vi.mock("@/routes/login.tsx", () => ({
  default: () => <div data-testid="login-page">Login Page</div>,
}));

vi.mock("@/routes/products.tsx", () => ({
  default: () => <div data-testid="products-page">Products Page</div>,
}));

vi.mock("@/routes/notFound.tsx", () => ({
  default: () => <div data-testid="not-found-page">404 Not Found</div>,
}));

vi.spyOn(console, 'error').mockImplementation(vi.fn())

describe("App component", () => {
  beforeEach(() => {
    window.history.pushState({}, "", "/"); // Start at home
    cleanup()
  });

  afterEach(() => {
    vi.resetModules();
    vi.resetAllMocks()
  });

  it("renders base UI correctly", async () => {
    render(<App />);
    expect(screen.getAllByText("Rosla Technologies")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Rosla Technologies")[1]).toBeInTheDocument();
    expect(
      screen.getByText("We are a green energy company focused on sustainability")
    ).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getByTestId("home-page")).toBeInTheDocument()
    );
  });

  it("renders footer", async () => {
    render(<App />);
     
    await waitFor(() => expect(screen.getByText("This is the footer")).toBeInTheDocument()) //@TODO update footer at some point
  });

  it("navigates to /status and loads the status page", async () => {
    render(<App />);

    const statusButton = screen.getByTestId("nav-item-status");
    fireEvent.click(statusButton);

    await waitFor(() =>
      expect(screen.getByTestId("status-page")).toBeInTheDocument()
    );

    expect(window.location.pathname).toBe("/status");
  });

  it("navigates to unknown route and shows NotFound", async () => {
    // simulate an unknown route
    window.history.pushState({}, "", "/unknown");
    render(<App />);

    await waitFor(() =>
      expect(screen.getByTestId("not-found-page")).toBeInTheDocument()
    );
    await waitFor(() => expect(console.error).toHaveBeenCalledOnce()) 
  });

  it("updates page on browser back button (popstate)", async () => {
    render(<App />);

    const loginButton = screen.getByTestId("nav-item-login");
    fireEvent.click(loginButton);

    await waitFor(() =>
      expect(screen.getByTestId("login-page")).toBeInTheDocument()
    );

    window.history.back();

    await waitFor(() =>
      expect(screen.getByTestId("home-page")).toBeInTheDocument()
    );
  });
});
