// src/index.ts
// Global exports – so we don’t have to import from a million places

// Bootstrap stuff (layout + UI components)
export { Container, Row, Col } from "react-bootstrap";
export {
  FormSelect,
  Table,
  Button,
  Form,
  Nav,
  Navbar,
  Modal,
} from "react-bootstrap";
// Carousel is special (default export)
export { default as Carousel } from "react-bootstrap/Carousel";

// React basics
export {
  useState,
  useEffect,
  createContext,
  useContext,
  type ReactNode,
} from "react";

// Router stuff
export { Link, useNavigate, useLocation, Navigate } from "react-router-dom";
