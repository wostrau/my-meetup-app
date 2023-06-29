import MeetupDetail from '../../components/meetups/MeetupDetail';

const MeetupDetails = () => {
    return <MeetupDetail />;
};

export const getStaticPaths = async () => {
    return {
        fallback: false,
        paths: [
            { params: { meetupId: 'm1' } },
            { params: { meetupId: 'm2' } }
        ]
    };
};

export const getStaticProps = async (context) => {
    const meetupId = context.params.meetupId;

    return {
        props: {
            meetupData: {
                id: meetupId,
                title: 'A First Meetup',
                image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
                address: 'Some address 5, 12345 Some City',
                description: 'This is a first meetup',
            }
        }
    };
};

export default MeetupDetails;