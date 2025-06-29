@Module
@InstallIn(SingletonComponent::class)
object DatabaseModule {

    @Provides
    @Singleton
    fun provideDatabase(@ApplicationContext context: Context): FirmDatabase {
        return Room.databaseBuilder(
            context,
            FirmDatabase::class.java,
            "firm_db"
        ).build()
    }

    @Provides
    fun provideFirmDao(db: FirmDatabase): FirmDao = db.firmDao()
}
