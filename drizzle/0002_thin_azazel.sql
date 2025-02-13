PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_documents` (
	`id` text PRIMARY KEY DEFAULT 'f7918932-8681-4c0d-88de-8c40ad8cb972' NOT NULL,
	`name` text NOT NULL,
	`path` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_documents`("id", "name", "path", "created_at") SELECT "id", "name", "path", "created_at" FROM `documents`;--> statement-breakpoint
DROP TABLE `documents`;--> statement-breakpoint
ALTER TABLE `__new_documents` RENAME TO `documents`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_knowledgebase` (
	`id` text PRIMARY KEY DEFAULT '05c81f2c-ac3c-4c38-bdd7-016e79565dc8' NOT NULL,
	`name` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`document_ids` text DEFAULT '[]' NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_knowledgebase`("id", "name", "created_at", "document_ids") SELECT "id", "name", "created_at", "document_ids" FROM `knowledgebase`;--> statement-breakpoint
DROP TABLE `knowledgebase`;--> statement-breakpoint
ALTER TABLE `__new_knowledgebase` RENAME TO `knowledgebase`;