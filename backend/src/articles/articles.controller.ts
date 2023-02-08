import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ArticlesService } from 'src/articles/articles.service';
import { CreateArticleDto } from 'src/articles/dto/create-article.dto';
import { UpdateArticleDto } from 'src/articles/dto/update-article.dto';
import { ArticleEntity } from 'src/entities/ArticleEntity';

@Controller('articles')
export class ArticlesController {
  constructor(private articleService: ArticlesService) {}

  @Get('seed')
  seed(): { message: string } {
    this.articleService.seed();
    return { message: 'seeding completed' };
  }

  @Get()
  getArticles(): ArticleEntity[] {
    return this.articleService.getArticles();
  }

  @Post()
  createArticle(@Body() createArticleDto: CreateArticleDto): ArticleEntity {
    return this.articleService.createArticle(createArticleDto);
  }

  @Get(':id')
  getArticleById(@Param('id') id: string): ArticleEntity {
    return this.articleService.getArticleById(id);
  }

  @Put(':id')
  updateArticle(
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ): ArticleEntity {
    return this.articleService.updateArticle(id, updateArticleDto);
  }
}
