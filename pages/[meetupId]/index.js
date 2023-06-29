import { MongoClient, ObjectId } from 'mongodb';
import MeetupDetail from '../../components/meetups/MeetupDetail';
import { Fragment } from 'react';
import Head from 'next/head';

const MeetupDetails = (props) => {
    return (
        <Fragment>
            <Head>
                <title>{props.meetupData.title}</title>
                <meta
                    name='description'
                    content={props.meetupData.description}
                />
            </Head>
            <MeetupDetail
                title={props.meetupData.title}
                image={props.meetupData.image}
                address={props.meetupData.address}
                description={props.meetupData.description}
            />
        </Fragment>
    );
};

export const getStaticPaths = async () => {
    const client = await MongoClient.connect('mongodb+srv://aostrovtsov:Zuyu2893@cluster0.9ebmahm.mongodb.net/meetups?retryWrites=true&w=majority');

    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

    client.close();

    return {
        fallback: false,
        paths: meetups.map(meetup => { params: { meetupId: meetup._id.toString(); } })
    };
};

export const getStaticProps = async (context) => {
    const meetupId = context.params.meetupId;

    const client = await MongoClient.connect('mongodb+srv://aostrovtsov:Zuyu2893@cluster0.9ebmahm.mongodb.net/meetups?retryWrites=true&w=majority');

    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const selectedMeetup = await meetupsCollection
        .findOne({ _id: ObjectId(meetupId) });

    client.close();

    return {
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                image: selectedMeetup.image,
                address: selectedMeetup.address,
                description: selectedMeetup.description,
            },
        },
    };
};

export default MeetupDetails;