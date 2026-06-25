import { v4 } from 'uuid'
import fs from 'fs/promises'


export const handleCover = async (file: Express.Multer.File) => {
	const allowed = ['image/jpeg', 'image/png', 'image/jpg']
	if (allowed.includes(file.mimetype)) {
		const coverName = `${v4()}.jpg`
		try {
			await fs.rename(
				file.path,
				`./public/images/covers/${coverName}`
			)
		}
		catch (error) {
			return false
		}
		return coverName
	}
	return false
}