const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//! Create
async function createVideoBNCC(ctx) {
  try {
    const {
      url,
      title,
      stage,
      curricularComponent,
      yearTeaching,
      axis,
      skills,
    } = ctx.request.body;

    const newVideoBNCC = await prisma.videoBNCC.create({
      data: {
        url,
        title,
        stage,
        curricularComponent,
        yearTeaching,
        axis: JSON.stringify(axis),
        skills: JSON.stringify(skills),
      },
    });

    ctx.body = newVideoBNCC;
  } catch (error) {
    console.error("Erro ao criar o vídeo:", error);
    ctx.status = 500;
    ctx.body = { error: "Erro ao criar o vídeo" };
  }
}

//! GET ALL VIDEOS
async function getVideosBNCC(ctx) {
  try {
    const videos = await prisma.videoBNCC.findMany({
      include: { employers: true },
    });
    ctx.body = videos.map((video) => ({
      ...video,
      axis: JSON.parse(video.axis),
      skills: JSON.parse(video.skills),
      date: video.createdAt, // Mapeando 'createdAt' para 'date'
      year: video.yearTeaching, // Mapeando 'yearTeaching' para 'year'
    }));
  } catch (error) {
    console.error("Erro ao buscar os vídeos:", error);
    ctx.status = 500;
    ctx.body = { error: "Erro ao buscar os vídeos" };
  }
}

//! GET FILTER VIDEOS
async function getVideosBNCCFilter(ctx) {
  try {
    const {
      id,
      url,
      title,
      stage,
      curricularComponent,
      yearTeaching,
      axis,
      skills,
    } = ctx.query;

    const filters = {};

    if (id !== undefined) filters.id = id;
    if (url !== undefined) filters.url = url;
    if (title !== undefined) filters.title = title;
    if (stage !== undefined) filters.stage = stage;
    if (curricularComponent !== undefined)
      filters.curricularComponent = curricularComponent;
    if (yearTeaching !== undefined)
      filters.yearTeaching = parseInt(yearTeaching, 10);

    const allVideos = await prisma.videoBNCC.findMany({
      where: filters,
      include: { employers: true },
    });

    const filteredVideos = allVideos.filter((video) => {
      let matches = true;

      if (axis !== undefined) {
        const videoAxis = JSON.parse(video.axis);
        matches = videoAxis.some((axisItem) => axis.includes(axisItem));
      }

      if (skills !== undefined) {
        const videoSkills = JSON.parse(video.skills);
        matches = videoSkills.some((skill) => skills.includes(skill));
      }
      return matches;
    });

    ctx.body = filteredVideos.map((video) => ({
      ...video,
      axis: JSON.parse(video.axis),
      skills: JSON.parse(video.skills),
      date: video.createdAt, // Mapeando 'createdAt' para 'date'
      year: video.yearTeaching, // Mapeando 'yearTeaching' para 'year'
    }));
  } catch (error) {
    console.error("Erro ao buscar os vídeos:", error);
    ctx.status = 500;
    ctx.body = { error: "Erro ao buscar os vídeos" };
  }
}

//! UPDATE BY ID
async function updateVideoBNCC(ctx) {
  try {
    const { id } = ctx.params;
    const {
      url,
      title,
      stage,
      curricularComponent,
      yearTeaching,
      axis,
      skills,
    } = ctx.request.body;

    const updatedVideo = await prisma.videoBNCC.update({
      where: { id },
      data: {
        url,
        title,
        stage,
        curricularComponent,
        yearTeaching,
        axis: JSON.stringify(axis),
        skills: JSON.stringify(skills),
      },
    });

    ctx.body = updatedVideo;
  } catch (error) {
    console.error("Erro ao atualizar o vídeo:", error);
    ctx.status = 500;
    ctx.body = { error: "Erro ao atualizar o vídeo" };
  }
}

async function deleteVideoBNCC(ctx) {
  try {
    const { id } = ctx.params;
    await prisma.videoBNCC.delete({
      where: { id },
    });
    ctx.status = 204;
  } catch (error) {
    console.error("Erro ao excluir o vídeo:", error);
    ctx.status = 500;
    ctx.body = { error: "Erro ao excluir o vídeo" };
  }
}

module.exports = {
  createVideoBNCC,
  getVideosBNCC,
  getVideosBNCCFilter,
  updateVideoBNCC,
  deleteVideoBNCC,
};