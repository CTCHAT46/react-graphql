import React from 'react'
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


function Attraction() {
    let params = useParams();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [attraction, setAttraction] = useState({});

    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var graphql = JSON.stringify({
            query: `query Query($attractionId: Int!) {
                attraction(id: $attractionId) {
                  id
                  name
                  detail
                  coverimage
                  latitude
                  longitude
                }
              }
      `,
            variables: { "attractionId": parseInt(params.id) }
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
                    setAttraction(result.data.attraction);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [params.id])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {

        return (
            <Container maxWidth="sm">
                <Card>
                    <CardMedia
                        component="img"
                        sx={{ width: 795, height: 455 }}
                        image={attraction.coverimage}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {attraction.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {attraction.detail}
                        </Typography>
                        latitude : {attraction.latitude}  longitude : {attraction.longitude}
                    </CardContent>
                    <CardActions>
                        <a href="/"> <Button>Back</Button></a>
                    </CardActions>
                </Card>
            </Container>
        )
    }
}
export default Attraction
