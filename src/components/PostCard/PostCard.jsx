import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function PostCard({ post }) {
    const { thumbnail, post_title, category, deadline, _id, volunteers_needed } = post;

    return (
        <Card className="mt-6">
            <CardHeader color="blue-gray" className="relative h-56">
                <img
                    src={thumbnail}
                    alt="card-image"
                />
            </CardHeader>
            <CardBody>
                <div className="flex justify-between items-center">
                    <Typography variant="h6" color="blue-gray" className="mb-2">
                        {post_title}
                    </Typography>
                    <Typography>
                        <span className="font-bold">Need : </span>{volunteers_needed}
                    </Typography>
                </div>
                <div className="flex justify-between items-center gap-5">
                    <Typography>
                        {category}
                    </Typography>
                    <Typography>
                        deadline : {deadline}
                    </Typography>
                </div>
            </CardBody>
            <CardFooter className="pt-0">
                <Link to={`/postDetails/${_id}`}><Button fullWidth>View Details</Button></Link>
            </CardFooter>
        </Card>
    );
}
