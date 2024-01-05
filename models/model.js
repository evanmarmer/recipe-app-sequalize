import Sequelize, { DataTypes, INTEGER, Model } from 'sequelize';

const sequelize = new Sequelize('postgresql:///recipe_app', { define: { underscored: true }})

class Ingredient extends Model {}

Ingredient.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(60),
            allowNull: false,
        },
        units: {
            type: DataTypes.STRING(60),
            allowNull: false,
        }
    },
    {
        modelName: 'ingredient',
        sequelize: sequelize,
        timestamps: false,
    }
)

class Recipe_ingredients extends Model {}

Recipe_ingredients.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, 
    {
        modelName: 'recipe_ingredients',
        sequelize: sequelize,
        timestamps: false,
    }
)

class Recipe extends Model {}

Recipe.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(60),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT
        },
        insructions: {
            type: DataTypes.TEXT
        },
    }, 
    {
        modelName: 'recipes',
        sequelize: sequelize,
        timestamps: false,
    }
)

class Author extends Model {}

Author.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        first_name: {
            type: DataTypes.STRING(40),
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING(40),
            allowNull: false,
        },
    }, 
    {
        modelName: 'authors',
        sequelize: sequelize,
        timestamps: false,
    }
)

Ingredient.hasMany(Recipe_ingredients, { foreignKey: 'ingredientId' });
Recipe_ingredients.belongsTo(Ingredient, { foreignKey: 'ingredientId' });

Recipe.hasMany(Recipe_ingredients, { foreignKey: 'recipeId' });
Recipe_ingredients.belongsTo(Recipe, { foreignKey: 'recipeId' });

Author.hasMany(Recipe, { foreignKey: 'authorId' });
Recipe.belongsTo(Author, { foreignKey: 'authorId' });



await sequelize.sync({ force: true })
await sequelize.close()