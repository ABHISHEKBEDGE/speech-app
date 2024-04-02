import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import NewsCard from '../components/NewsCard';
import Home from '../components/Home';
import axios from 'axios';
import HomeFaculty from '../components/HomeFaculty';
import HomeResearch from '../components/HomeResearch';

const HomeScreen = () => {
  const [news, setNews] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [research, setResearch] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const newsResponse = await axios.get('/api/news');
      setNews(newsResponse.data);

      const facultyResponse = await axios.get('/api/people/faculty');
      setFaculty(facultyResponse.data);

      const researchResponse = await axios.get('/api/research'); // Fetch research data
      setResearch(researchResponse.data);
    };
    fetchData();
  }, []);

  return (
    <Row>
      {/* Left 2/3 part of the screen */}
      <Col xs={12} lg={8}>
        <Home />
      </Col>
      {/* Right 1/3 part of the screen */}
      <Col xs={12} lg={4}>
        <div className="my-3 p-3 rounded border">
          <h1 className='text-center'>Latest News</h1>
          {news.map((article) => (
            <NewsCard key={article._id} article={article} />
          ))}
        </div>
      </Col>
      {/* Faculty section */}
      <Col xs={12}>
        <div className="my-3 p-3 rounded border">
          <h1 className="my-4 text-center">SITAR Associated Faculty</h1>
          <Row xs={1} sm={1} md={4} lg={5} className="g-4">
            {faculty.map((facultyMember) => (
              <Col key={facultyMember._id}>
                <HomeFaculty faculty={facultyMember} />
              </Col>
            ))}
          </Row>
        </div>
        <div className="my-3 p-3 rounded border">
          <h1 className="my-4 text-center">SITAR GROUP</h1>
          <Row className="justify-content-center">
            <Col xs={12} md={6} className="text-center">
              <img src="/images/home/SITARflowchart.png" alt="SITAR Group" className="img-fluid" />
            </Col>
          </Row>
        </div>
         {/* Display HomeResearch component with research data */}
         <div className="my-3 p-3 rounded border">
          <h1 className="my-4 text-center">Research Areas</h1>
          <Row xs={1} md={2} lg={3} className="g-4">
            {research.map((researchItem) => (
              <Col key={researchItem._id}>
                <HomeResearch research={researchItem} />
              </Col>
            ))}
          </Row>
        </div>
      </Col>
    </Row>
  );
};

export default HomeScreen;