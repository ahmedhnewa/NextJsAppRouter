"use client"

import { staticTopics } from "@/services/api/unsplashApi";
import { capitalizeFirstLetter } from "@/utils/String";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";

const NavBar = () => {
    const pathname = usePathname()

    return (
        <Navbar bg="primary" variant="dark" sticky="top" expand="sm" collapseOnSelect>
            <Container>
                <Navbar.Brand as={Link} href="/">
                    Image Gallery Next Js
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="mainNavBar" />
                <Navbar.Collapse id="mainNavBar">
                    <Nav>
                        <Nav.Link as={Link} href="/static" active={pathname === '/static'}>Static</Nav.Link>
                        <Nav.Link as={Link} href="/dynamic" active={pathname === '/dynamic'}>Dynamic</Nav.Link>
                        <Nav.Link as={Link} href="/isr" active={pathname === '/isr'}>ISR</Nav.Link>
                        <NavDropdown title='Topics' id="topicsDropdown">
                            {staticTopics.map(topic => (
                                <NavDropdown.Item
                                    key={topic}
                                    as={Link}
                                    href={`/topics/${topic}`}>
                                    {capitalizeFirstLetter(topic)}
                                </NavDropdown.Item>
                            ))}
                        </NavDropdown>
                        <Nav.Link as={Link} href="/search" active={pathname === '/search'}>Search</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;