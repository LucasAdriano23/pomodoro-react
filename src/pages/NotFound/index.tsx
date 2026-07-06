import { Container } from "../../components/Container";
import { GenericHtml } from "../../components/GenericHtml";
import { MainTemplate } from "../../templates/MainTemplates";

export function NotFound(){
    return (
        <MainTemplate>
            <Container>
                <GenericHtml>
                    <h1>Página não encontrada</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque rerum sequi sit, doloribus eveniet architecto, mollitia quam ut a omnis, ab recusandae cupiditate nulla sed voluptas reprehenderit dignissimos molestias est?</p>
                </GenericHtml>
            </Container>
        </MainTemplate>
    );
}