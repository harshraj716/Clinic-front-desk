@@ .. @@
 async function bootstrap() {
   const app = await NestFactory.create(AppModule);
 
   app.enableCors();
   app.setGlobalPrefix('api');
   app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
 
-  const PORT = process.env.PORT || 3000;
+  const PORT = process.env.PORT || 3001;
   await app.listen(PORT);
   console.log(`🚀 Server running at http://localhost:${PORT}/api`);
 }