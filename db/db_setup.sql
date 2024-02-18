drop schema IF EXISTS recipes_maker cascade;

create schema recipes_maker;

create table recipes_maker.RECIPE (
    recipe_id     SERIAL PRIMARY KEY,
    title         TEXT NOT NULL,
    description   TEXT NOT NULL,
    created_at    TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

comment on table recipes_maker.RECIPE is
'DESCRIPTION:
Store information about recipes';


create table recipes_maker.INGREDIENTS (
    ingredient_id SERIAL PRIMARY KEY,
    recipe_id     INTEGER NOT NULL,
    name          TEXT NOT NULL,
    quantity      TEXT NOT NULL,
    FOREIGN KEY (recipe_id) REFERENCES recipes_maker.RECIPE(recipe_id)
);

comment on table recipes_maker.INGREDIENTS is
'DESCRIPTION:
Store ingredients';