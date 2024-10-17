import React from 'react';

const Home = () => {
  return (
    <div className="container mx-auto my-8 p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Home</h1>
        <p className="text-lg">
          SITAR group is a collection of innovative labs focused on Speech, Image, Text, and Artificial Intelligence Research, hence the name SITAR. Each lab, having a specific specialization, works dynamically in collaboration with the other labs to develop cutting-edge technologies for the nation.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-center">Vision</h2>
          <p>
            To be a global leader in Artificial Intelligence and Data Science research by addressing real-world challenges.
          </p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-center">Mission</h2>
          <p>
            To carry out cutting-edge research in speech, image, vision, and text applications using AI/ML and Data Science.
          </p>
          <p>
            To establish industrial and academia collaborations with national and international researchers.
          </p>
          <p>
            To carry out translational research in SITAR for industrial and societal applications.
          </p>
          <p>
            To execute projects of national and international importance in relevant areas.
          </p>
          <p>
            To develop competency and skill-set in relevant areas.
          </p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-center">Objectives</h2>
          <p>
            To set laboratories with state-of-the-art facilities in areas related to SITAR.
          </p>
          <p>
            End-to-end solutions to real-world issues through the use of technology.
          </p>
          <p>
            To secure externally funded projects in SITAR.
          </p>
          <p>
            To create a manpower pool of students, researchers, and project staff working in SITAR.
          </p>
          <p>
            To publish research articles in reputed venues.
          </p>
          <p>
            To create resources for research and development in SITAR areas & organize challenges.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
