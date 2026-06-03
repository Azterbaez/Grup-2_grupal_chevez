import { Container, Card} from "react-bootstrap";

const DashboardVentas =() => {
return (
  <Container>
    <br />
    <Card style={{height: 600}}>
      <iframe
      title="estadisticas"
      width="100%"
      height="100%"
      src="https://app.powerbi.com/view?r=eyJrIjoiODQxNWE1MTAtMGI1Ni00MGJiLWI4ZWQtNDBlMjUwODNmYmIxIiwidCI6ImU0NzY0NmZlLWRhMjctNDUxOC04NDM2LTVmOGIxNThiYTEyNyIsImMiOjR9"
      allowfullScreen="true">
        </iframe>
    </Card>
  </Container>

);

};

export default DashboardVentas;