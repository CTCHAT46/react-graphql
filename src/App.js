import { useEffect, useState } from "react";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var graphql = JSON.stringify({
      query: `query Query {
        attractions {
          id
          name
          detail
          coverimage
        }
      }
      `,
      variables: {}
    })
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: graphql,
      redirect: 'follow'
    };

    fetch("http://localhost:4000/", requestOptions)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.data.attractions);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="px-10px">
        <Box>
          <AppBar position="static">
            <Toolbar>

              <AddAPhotoIcon />

              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                7 Wonders of the world
              </Typography>

            </Toolbar>
          </AppBar>
        </Box>


        <div>
          <Box sx={{
            p: 0.5,
            m: 0.5,
          }}>
            <Container className="contianer" maxWith="lg">
              <Grid container spacing={2}>
                {items.map(item => (
                  <Grid item xs={12} md={4}>
                    <Card>
                      <CardMedia
                        sx={{ width: 400, height: 350 }} cols={3} rowHeight={164}
                        image={item.coverimage}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {item.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" noWrap={true}>
                          {item.detail}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <a href={"/attraction/" + item.id}>
                          <Button size="small">Learn More</Button></a>
                      </CardActions>
                    </Card>

                  </Grid>
                ))}
              </Grid>
            </Container>
          </Box>
        </div>

      </div>

    );
  }
}
export default App;