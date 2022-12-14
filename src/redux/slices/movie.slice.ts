import {AxiosError} from "axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {ICast, IGenre, IGenreResponse, IMovie, IMovieCredits, IMovieDetails, IMovieResponse} from "../../interfaces";
import {movieService} from "../../services";

interface IState {
    movies: IMovie[];
    movie: IMovieDetails | null;
    credits: ICast[];
    genres: IGenre[];
    search: IMovie[];
    page: number;
    total_pages: number;
}

const initialState: IState = {
    movies: [],
    movie: null,
    credits: [],
    genres: [],
    search: [],
    page: 1,
    total_pages: 500,

};

const getAll = createAsyncThunk<IMovieResponse, { pageTotal: number }>(
    'movieSlice/getAll',
    async ({pageTotal}, {rejectWithValue}) => {
        try {
            const {data} = await movieService.getAll(pageTotal);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
);
const getNow = createAsyncThunk<IMovieResponse, { pageTotal: number }>(
    'movieSlice/getNow',
    async ({pageTotal}, {rejectWithValue}) => {
        try {
            const {data} = await movieService.getMovieNow(pageTotal);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
);
const getUpcoming = createAsyncThunk<IMovieResponse, { pageTotal: number }>(
    'movieSlice/getUpcoming',
    async ({pageTotal}, {rejectWithValue}) => {
        try {
            const {data} = await movieService.getMovieUpcoming(pageTotal);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
);
const getTop = createAsyncThunk<IMovieResponse, { pageTotal: number }>(
    'movieSlice/getTop',
    async ({pageTotal}, {rejectWithValue}) => {
        try {
            const {data} = await movieService.getMovieTop(pageTotal);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
);
const getDetails = createAsyncThunk<IMovieDetails, { id: string | undefined }>(
    'movieSlice/getDetails',
    async ({id}, {rejectWithValue}) => {
        try {
            const {data} = await movieService.getDetails(id);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
);

const getCredits = createAsyncThunk<IMovieCredits, { id: string | undefined }>(
    'movieSlice/getCredits',
    async ({id}, {rejectWithValue}) => {
        try {
            const {data} = await movieService.getCredits(id);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
);

const getMoviesByGenre = createAsyncThunk<IMovieResponse, { pageTotal: number, id: string | undefined }>(
    'movieSlice/getMoviesByGenre',
    async ({pageTotal, id}, {rejectWithValue}) => {
        try {
            const {data} = await movieService.getByGenreId(id, pageTotal);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
);

const getGenres = createAsyncThunk<IGenreResponse, void>(
    'movieSlice/getGenres',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await movieService.getGenres();
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
);

const getBySearchMovie = createAsyncThunk<IMovieResponse, { search: string }>(
    'movieSlice/getBySearchMovie',
    async ({search}, {rejectWithValue}) => {
        try {
            console.log(search)
            const {data} = await movieService.getBySearchMovie(search);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
);


const movieSlice = createSlice({
    name: 'movieSlice',
    initialState,
    reducers: {},

    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.movies = action.payload.results;
                state.page = action.payload.page;
            })
            .addCase(getNow.fulfilled, (state, action) => {
                state.movies = action.payload.results;
                state.page = action.payload.page;
            })
            .addCase(getUpcoming.fulfilled, (state, action) => {
                state.movies = action.payload.results;
                state.page = action.payload.page;
            })
            .addCase(getTop.fulfilled, (state, action) => {
                state.movies = action.payload.results;
                state.page = action.payload.page;
            })
            .addCase(getDetails.fulfilled, (state, action) => {
                state.movie = action.payload;
            })
            .addCase(getCredits.fulfilled, (state, action) => {
                state.credits = action.payload.cast.slice(0, 14);
            })
            .addCase(getMoviesByGenre.fulfilled, (state, action) => {
                state.movies = action.payload.results;
                state.page = action.payload.page;
            })
            .addCase(getGenres.fulfilled, (state, action) => {
                state.genres = action.payload.genres;
            })
            .addCase(getBySearchMovie.fulfilled, (state, action) => {
                state.search = action.payload.results;
                state.page = action.payload.page;
            })

});

const {reducer: movieReducer} = movieSlice;

const movieActions = {
    getAll,
    getNow,
    getUpcoming,
    getTop,
    getDetails,
    getCredits,
    getMoviesByGenre,
    getGenres,
    getBySearchMovie
};

export {
    movieReducer,
    movieActions
}