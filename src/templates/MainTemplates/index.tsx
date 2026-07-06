import { Container } from "../../components/Container";
import { Heading } from "../../components/Heading";
import { Logo } from "../../components/Logo";
import { Menu } from "../../components/Menu";
import { Footer } from "../../components/Footer";

type MainTemplateProps = {
    children: React.ReactNode
}

export function MainTemplate( { children }:MainTemplateProps){
    return (
        <>
            <Container>
                <Heading>
                    <Logo/>
                </Heading>
            </Container>

            <Container>
                <Heading>
                    <Menu/>
                </Heading>
            </Container>

            {children}

            <Container>
                <Footer/>
            </Container>
        </>
    )
}