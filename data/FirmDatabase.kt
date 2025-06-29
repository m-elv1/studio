@Database(entities = [FirmEntity::class], version = 1)
abstract class FirmDatabase : RoomDatabase() {
    abstract fun firmDao(): FirmDao
}
