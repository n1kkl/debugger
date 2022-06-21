import {FC, ReactElement} from "react";
import * as yup from 'yup';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useApiUrl} from "../hooks/use-api-url";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

interface FormData {
    title: string;
}

const schema = yup.object().shape({
    title: yup.string()
        .required('Title is required.')
        .min(4, 'Title must be at least 4 characters long.')
        .max(32, 'Title must be shorter than 32 characters.')
});

export const CreateChannelPage: FC = (): ReactElement => {
    const channelUrl = useApiUrl('channel');
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors}} = useForm<FormData>({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data: FormData) => {
        fetch(channelUrl, {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(async (res) => {
            if (res.ok) {
                toast.success('Channel created.');
                navigate('/channel/' + (await res.json()).slug);
            } else {
                toast.error('Unknown error.');
            }
        });
    };

    return (
        <div className="my-auto bg-white p-7 rounded-md shadow-sm w-full max-w-xl mx-auto">
            <form className="relative" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex gap-2">
                    <div className="form-group grow">
                        <input {...register('title')} type="text" id="title" className="form-control" placeholder="My Channel"/>
                    </div>
                    <div>
                        <button type="submit" className="btn h-full">Create</button>
                    </div>
                </div>
                <small className="text-red-400 absolute ml-1">{errors.title?.message}</small>
            </form>
        </div>
    );
};